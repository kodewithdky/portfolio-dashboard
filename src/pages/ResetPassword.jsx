import LoadingButton from "./sub-components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllForgotResetPassErrors,
  resetPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleResetPassword = () => {
    dispatch(resetPassword(token, newPassword, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser());
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, error, loading]);
  return (
    <Card className="mx-auto max-w-sm my-16">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">New Password</Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {loading ? (
            <LoadingButton content={"Resetting Password"} />
          ) : (
            <Button
              type="submit"
              className="w-full"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
