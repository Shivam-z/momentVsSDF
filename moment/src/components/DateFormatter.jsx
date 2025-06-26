import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import axios from "axios";
import debounce from "lodash/debounce";
import "./DateFormatter.css";

const DateFormatter = () => {
  const [momentFormat, setMomentFormat] = useState("YYYYMMdd");
  const [javaFormat, setJavaFormat] = useState("yyyyMMdd");
  const [sameFormat, setSameFormat] = useState(false);
  const [momentFormatted, setMomentFormatted] = useState("");
  const [javaFormatted, setJavaFormatted] = useState("");

  // Formatting logic wrapped with debounce
  const debouncedFormat = useCallback(
    debounce((mFormat, jFormat) => {
      try {
        const now = moment();
        const mFormatted = now.format(mFormat);
        setMomentFormatted(mFormatted);
      } catch (e) {
        setMomentFormatted("Invalid Moment.js format");
      }

      axios
        .post("/api/format-date", {
          format: jFormat,
        })
        .then((res) => {
          setJavaFormatted(res.data.formattedDate);
        })
        .catch(() => {
          setJavaFormatted("Error formatting in Java");
        });
    }, 500),
    []
  );

  // useEffect to watch input change
  useEffect(() => {
    debouncedFormat(momentFormat, javaFormat);
  }, [momentFormat, javaFormat, debouncedFormat]);

  const handleSameFormatToggle = (checked) => {
    setSameFormat(checked);
    if (checked) {
      setJavaFormat(momentFormat);
    }
  };

  return (
    <div className="container">
      <h1>Date Formatter</h1>

      <div className="input-section">
        <label>
          <input
            type="checkbox"
            checked={sameFormat}
            onChange={(e) => handleSameFormatToggle(e.target.checked)}
          />
          Use same format for both
        </label>

        <div className="input-group">
          <label>Moment.js Format</label>
          <input
            type="text"
            value={momentFormat}
            onChange={(e) => {
              setMomentFormat(e.target.value);
              if (sameFormat) setJavaFormat(e.target.value);
            }}
            placeholder="e.g. YYYYMMdd"
          />
        </div>

        <div className="input-group">
          <label>Java SimpleDateFormat</label>
          <input
            type="text"
            value={javaFormat}
            onChange={(e) => setJavaFormat(e.target.value)}
            placeholder="e.g. yyyyMMdd"
            disabled={sameFormat}
          />
        </div>
      </div>

      <div className="result-section">
        <h3>Results</h3>
        <div className="results">
          <div>
            <strong>Moment.js:</strong> {momentFormatted}
          </div>
          <div>
            <strong>SDF Java :</strong> {javaFormatted}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateFormatter;
