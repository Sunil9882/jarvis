export const uploadToCloudinary = async (pics) => {
    if (pics) {
        try {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "ml_default");
            data.append("cloud_name", "doisoqyif");

            const res = await fetch("https://api.cloudinary.com/v1_1/doisoqyif/image/upload", {
                method: "POST",
                body: data
            });

            if (!res.ok) {
                throw new Error("Network response was not ok " + res.statusText);
            }

            const fileData = await res.json();

            return fileData.url.toString();
        } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error; // Optionally rethrow the error if you want to handle it elsewhere
        }
    } else {
        console.error("No picture provided to upload function");
    }
};




// export const uploadToCloudinary=async (pics)=>{

//     if(pics){
//         const data = new FormData();
//         data.append("file", pics)
//         data.append("upload_preset", "ml_default");
//         data.append("cloud_name","doisoqyif");

//         const res = await fetch("https://api.cloudinary.com/v1_1/doisoqyif/image/upload", {
//             method:"post",
//             body:data
//         })

//         const fileData = await res.json();

//         return fileData.url.toString();
//     }
//     else{
//         console.log("error from upload function");
//     }
// }