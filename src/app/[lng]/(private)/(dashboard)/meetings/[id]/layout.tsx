import React from "react";

export default function Layout({
  detail,
  images,
  status,
}: {
  detail: React.ReactNode;
  images: React.ReactNode;
  status: React.ReactNode;
}) {
  return (
    <div>
      <div> {"this is the meeting detail that already being set"}</div>
      {detail}
      {images}
      {status}
    </div>
  );
}
