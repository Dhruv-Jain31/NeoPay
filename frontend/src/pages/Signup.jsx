import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = localStorage.getItem("token");

        //check if token exists in local storage
        if (userToken) {
            navigate("/dashboard")
        }
    }, []);

    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} placeholder="Dhruv" label={"First Name"} />

                <InputBox onChange={e => {
                    setLastName(e.target.value);
                }} placeholder="Jain" label={"Last Name"} />

                <InputBox onChange={e => {
                    setUsername(e.target.value);
                }} placeholder="dj@outlook.com" label={"Email"} />

                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="Password" label={"Password"} type="password" />

                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard")
                    }} label={"Sign up"} />
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
