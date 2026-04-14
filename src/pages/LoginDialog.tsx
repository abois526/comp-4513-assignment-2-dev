/**
 * Dialog component for my login functionality (or rather, lack thereof as it is just a Potemkin village). This just simulates a login, so when the form gets submitted the isLoggedIn state in the context provider changes from false to true. The open state is just a workaround for making the dialog actually close when the user "logs in". 
 */

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