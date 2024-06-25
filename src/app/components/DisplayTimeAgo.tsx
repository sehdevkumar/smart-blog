/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Import necessary libraries and plugins
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
// Extend Day.js with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const DisplayTimeAgo = ({ timestamp }: { timestamp: any }) => {
  const [getTime, setTime] = useState<string>();
  const timeRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const formattedDate = dayjs(+timestamp ?? new Date()).format(
      "dddd, D MMMM YYYY HH:mm:ss.SSS [GMT]Z"
    );
    const date = dayjs(formattedDate).tz("Asia/Kolkata");
    const ref = setInterval(() => {
      setTime(dayjs(date).fromNow());
    }, 1000);

    timeRef.current = ref;

    return () => {
      clearInterval(timeRef.current);
    };
  }, [timestamp]);

  return <span className="font-isb text-[14px]" style={{ color: "#939393" }}>Started at: {getTime}</span>;
};

export default React.memo(DisplayTimeAgo);
