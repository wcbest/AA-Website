"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import firebase from "@/firebase/firebase";
import "firebase/compat/storage";

interface ImageUploadProps {
  setFile: any;
  file?: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setFile, file }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState("");

  const fileInputRef = useRef<any>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onFileSelected = (e: any) => {
    let file = e.target.files[0];
    var storageRef = firebase.storage().ref("/billboards/" + file.name);

    let uploadTask = storageRef.put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading("Upload is " + progress + "% done");
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            setLoading("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            setLoading("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setLoading("");
          setSelectedFile(downloadURL);
          setFile(downloadURL);
        });
      }
    );
  };

  const handleUploadButtonClick = () => {
    // Trigger the file input click when the button is clicked
    fileInputRef.current.click();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {selectedFile.length > 0 || file?.length > 0 ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => {
                  setSelectedFile("");
                  setFile("");
                }}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <Image
              fill
              className="object-cover"
              alt="Image"
              src={selectedFile || file}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            />
          </div>
        ) : null}
      </div>
      <p className="text-black text-xs mb-4">{loading}</p>
      <Button
        type="button"
        disabled={false}
        onClick={handleUploadButtonClick}
        className="mb-4 text-white bg-black"
      >
        <ImagePlus className="h-4 w-4 mr-2 " />
        Upload an Image
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onFileSelected}
      />
    </div>
  );
};

export default ImageUpload;
