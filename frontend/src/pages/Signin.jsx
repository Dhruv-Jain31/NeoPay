import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

const Signin = () => {
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your information to access your account"} />
                <InputBox placeholder="dj@outlook.com" label={"Email"} />
                <InputBox placeholder="Password" label={"Password"} type="password" />
                <div className="pt-4">
                    <Button label={"Sign in"} />
                </div>
                <BottomWarning
                    label={"Don't have an account?"}
                    buttonText={"Sign up"}
                    to={"/signup"}
                />
                </div>
            </div>
        </div>
    );
}

export default Signin;
