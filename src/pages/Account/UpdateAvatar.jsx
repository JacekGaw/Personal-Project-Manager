import React, { useState, useContext } from "react";
import Button from "../../components/UI/Button";
import { AuthContext } from "../../store/auth-context";

const UpdateAvatar = () => {
  const { updateUserAvatar } = useContext(AuthContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [photo, setPhoto] = useState();

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    if (photo) {
      try {
        setButtonDisabled(true);
        await updateUserAvatar(photo);
      } catch (e) {
        console.log(e);
      }
      setButtonDisabled(false);
    }
  };

  const handleUpdateImage = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <>
      <section className=" sm:mx-auto  sm:max-w-[600px]  p-5 my-2 bg-white rounded-xl">
        <header>
          <h3 className="px-2 pb-2 text-center font-[400] text-slate-700 text-lg">
            Update Avatar:
          </h3>
        </header>
        <div>
          <form
            onSubmit={handleUpdateAvatar}
            className="flex justify-center flex-col sm:flex-row items-center"
          >
            <label
              htmlFor="avatar-file"
              className="font-[600] text-slate-700 text-sm mr-2"
            >
              Update Avatar:{" "}
            </label>
            <input
              type="file"
              id="avatar-file"
              className="font-[400] text-slate-500 text-xs flex flex-col justify-center items-center"
              onChange={handleUpdateImage}
            />
            <Button
              disabled={buttonDisabled}
              type="submit"
              className={`disabled:bg-cream text-sm py-1 px-2`}
            >
              Update
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateAvatar;
