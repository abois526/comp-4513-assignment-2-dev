import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from 'react';
import { AppContext } from "@/context/appContext";

const LoginDialog = () => {
  const {setIsLoggedIn} = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <LoginForm onLogin={handleLogin} />
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default LoginDialog;