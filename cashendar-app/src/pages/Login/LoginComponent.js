import { React, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Logo from "../../layouts/Logo";
import "./login.css";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

function LoginComponent(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const auth = getAuth();
    const onSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed In
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const userEmail = user.email;
                props.setUser(userEmail);
            } else {
                // User is signed out
                // ...
                props.setUser(null);
            }
        });
    };
    return (
        <div className="login-box">
            <Container id="panel">
                <Logo className="logoImg" />
                <div className="form-title">로그인</div>
                <Form className="form" onSubmit={onSubmit}>
                    <Form.Group
                        as={Row}
                        className="mb-4"
                        controlId="formPlaintextPassword"
                    >
                        <Col sm>
                            <Form.Control
                                type="text"
                                placeholder="이메일을 입력해주세요"
                                value={email}
                                key="emailId"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className=""
                        controlId="formPlaintextPassword"
                    >
                        <Col sm>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                key="pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    <br />

                    <div className="d-grid gap-1">
                        <Button className="button-style" type="submit">
                            로그인
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
export default LoginComponent;
