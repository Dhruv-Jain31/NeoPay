import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

const Signin = () => {
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox placeholder="Dhruv" label={"First Name"} />
                <InputBox placeholder="Jain" label={"Last Name"} />
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
    );
}

export default Signin;
