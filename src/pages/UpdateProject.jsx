import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";
import { Button } from "@/components/ui/button";
import LoadingButton from "./sub-components/LoadingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:7071/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
          setStack(res.data.data.stack);
          setDeployed(res.data.data.deployed);
          setTechnologies(res.data.data.technologies);
          setGitRepoLink(res.data.data.gitRepoLink);
          setProjectLink(res.data.data.projectLink);
          setProjectBanner(
            res.data.data.projectBanner && res.data.data.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response?.data?.message);
        });
    };
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  };

  const navigate = useNavigate();
  const handleReturnToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
      <form
        onSubmit={handleUpdateProject}
        className="w-[100%] px-5 md:w-[1000px] pb-5"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
                UPDATE PROJECT
              </h2>
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <img
                  src={
                    projectBannerPreview ? projectBannerPreview : projectBanner
                  }
                  alt="projectBanner"
                  className="w-full h-auto"
                />
                <div className="relative">
                  <Input
                    type="file"
                    onChange={handleProjectBanner}
                    className="avatar-update-btn mt-4 w-full"
                  />
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Title
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
                    <Input
                      type="text"
                      className="block flex-1 border-0 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="MERN STACK PORTFOLIO"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
                    <Textarea
                      placeholder="Feature 1. Feature 2. Feature 3."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Technologies Uses In This Project
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
                    <Textarea
                      placeholder="HTML, CSS, JAVASCRIPT, REACT"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Stack
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
                    <Select
                      value={stack}
                      onValueChange={(selectedValue) => setStack(selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project Stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Stack">Full Stack</SelectItem>
                        <SelectItem value="Mern">MERN</SelectItem>
                        <SelectItem value="Mean">MEAN</SelectItem>
                        <SelectItem value="Next.JS">NEXT.JS</SelectItem>
                        <SelectItem value="React.JS">REACT.JS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Deployed
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ">
                    <Select
                      value={deployed}
                      onValueChange={(selectedValue) =>
                        setDeployed(selectedValue)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Is this project deployed?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Github Repository Link
                </Label>
                <div className="mt-2">
                  <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  ">
                    <Input
                      type="text"
                      className="block flex-1 border-0 py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Github Repository Link"
                      value={gitRepoLink}
                      onChange={(e) => setGitRepoLink(e.target.value)}
                    />
                    <Link className="absolute w-5 h-5 left-1 top-2" />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Project Link
                </Label>
                <div className="mt-2">
                  <div className="relative flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset  ">
                    <Input
                      type="text"
                      className="block flex-1 border-0 py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Github Repository Link"
                      value={projectLink}
                      onChange={(e) => setProjectLink(e.target.value)}
                    />
                    <Link className="absolute w-5 h-5 left-1 top-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <LoadingButton content={"Updating"} width={"w-52"} />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
