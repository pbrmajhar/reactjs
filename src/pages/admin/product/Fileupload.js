import React, { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Sidebar from "../Sidebar";

const Fileupload = () => {
  const [file, setFile] = useState(null);

  const fileHandle = async (e) => {
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri)
          },
          "base64"
        );
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: "100px" }}>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col" style={{ marginBottom: "10px" }}>
          <form>
            <input
              className="form-control"
              type="file"
              multiple
              accept="images/*"
              onChange={fileHandle}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Fileupload;
