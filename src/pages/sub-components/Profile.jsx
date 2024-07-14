import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-balance text-muted-foreground">
              Full Profile Preview
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Profile Image</Label>
                <img
                  src={user && user.data?.avatar && user?.data.avatar?.url}
                  alt="avatar"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              </div>
              <div className="grid gap-2 w-full sm:w-72">
                <Label>Resume</Label>
                <Link
                  to={user && user.data.resume && user.data.resume?.url}
                  target="_blank"
                >
                  <img
                    src={user && user.data.resume && user.data.resume?.url}
                    alt="resume"
                    className="w-full  h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </Link>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input type="text" defaultValue={user.data?.name} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={user.data?.email} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input type="text" defaultValue={user.data?.phone} disabled />
            </div>
            <div className="grid gap-2">
              <Label>About Me</Label>
              <Textarea defaultValue={user.data.about} disabled />
            </div>
            <div className="grid gap-2">
              <Label>PortfolioL</Label>
              <Input type="text" defaultValue={user.data?.portfolio_url} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Github</Label>
              <Input type="text" defaultValue={user.data?.github} disabled />
            </div>
            <div className="grid gap-2">
              <Label>LinkedIn</Label>
              <Input type="text" defaultValue={user.data?.linkedIn} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Youtube</Label>
              <Input type="text" defaultValue={user.data?.youtube} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Instagram</Label>
              <Input type="text" defaultValue={user.data?.instagram} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Twitter(X)</Label>
              <Input type="text" defaultValue={user.data?.twitter} disabled />
            </div>
            <div className="grid gap-2">
              <Label>Facebook</Label>
              <Input type="text" defaultValue={user.data?.facebook} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
