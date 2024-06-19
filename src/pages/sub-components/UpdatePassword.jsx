import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllUserErrors,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import LoadingButton from "./LoadingButton";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, isAuthenticated, error, message, isUpdated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [dispatch, isAuthenticated, error, message]);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input
                  type="password"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()}
                  className="w-full"
                >
                  Update Password
                </Button>
              ) : (
                <LoadingButton content={"Updating Password"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
