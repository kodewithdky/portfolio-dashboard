import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import LoadingButton from "./LoadingButton";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState(user && user.data?.name);
  const [email, setEmail] = useState(user && user.data?.email);
  const [phone, setPhone] = useState(user && user.data?.phone);
  const [about, setAbout] = useState(user && user.data?.about);
  const [portfolio_url, setPortfolio_Url] = useState(
    user && user.data?.portfolio_url
  );
  const [linkedIn, setLinkedIn] = useState(
    user && (user.data?.linkedIn === "undefined" ? "" : user.data?.linkedIn)
  );
  const [github, setGithub] = useState(
    user && (user.data?.github === "undefined" ? "" : user.data?.github)
  );
  const [instagram, setInstagram] = useState(
    user && (user.data?.instagram === "undefined" ? "" : user.data?.instagram)
  );
  const [twitter, setTwitter] = useState(
    user && (user.data?.twitter === "undefined" ? "" : user.data?.twitter)
  );
  const [facebook, setFacebook] = useState(
    user && (user.data?.facebook === "undefined" ? "" : user.data?.facebook)
  );
  const [youtube, setYoutube] = useState(
    user && (user.data?.youtube === "undefined" ? "" : user.data?.youtube)
  );
  const [avatar, setAvatar] = useState(
    user && user.data?.avatar && user.data.avatar?.url
  );
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.data?.avatar && user.data.avatar?.url
  );
  const [resume, setResume] = useState(
    user && user.data?.resume && user.data.resume?.url
  );
  const [resumePreview, setResumePreview] = useState(
    user && user.data?.resume && user.data.resume?.url
  );

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("about", about);
    formData.append("portfolio", portfolio_url);
    formData.append("linkedIn", linkedIn);
    formData.append("github", github);
    formData.append("youtube", youtube);
    formData.append("instagram", instagram);
    formData.append("twitter", twitter);
    formData.append("facebook", facebook);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Profile Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                  >
                    <img
                      src={resumePreview ? resumePreview : "/avatarHolder.jpg"}
                      alt="avatar"
                      className="w-full  h-auto sm:w-72 sm:h-72 rounded-2xl"
                    />
                  </Link>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={resumeHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  className="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  className="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  className="About Me"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input
                  type="text"
                  className="Portfolio URL"
                  value={portfolio_url}
                  onChange={(e) => setPortfolio_Url(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  className="LinkedIn URL"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Youtube</Label>
                <Input
                  type="text"
                  className="Youtube URL"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  className="Github URL"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  className="Instagram URL"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input
                  type="text"
                  className="Twitter(X) URL"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input
                  type="text"
                  className="Facebook URL"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdateProfile()}
                  className="w-full"
                >
                  Update Profile
                </Button>
              ) : (
                <LoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
