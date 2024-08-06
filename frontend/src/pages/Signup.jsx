import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

const Signup = () => {
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox placeholder="Dhruv" label={"First Name"} />
                <InputBox placeholder="Jain" label={"Last Name"} />
                <InputBox placeholder="dj@outlook.com" label={"Email"} />
                <InputBox placeholder="Password" label={"Password"} type="password" />
                <div className="pt-4">
                    <Button label={"Sign up"} />
                </div>
                <BottomWarning
                    label={"Already have an account"}
                    buttonText={"Sign in"}
                    to={"/signin"}
                />
                </div>
            </div>
        </div>
    );
}


export default Signup;
