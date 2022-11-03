import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./login.css";
import React, { useState } from "react";
import Logo from "../../layouts/Logo";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fbase/fbase";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            data = await auth.signInWithEmailAndPassword(username, password);
        } catch (error) {
            setErrors(error.message);
        }
    };

    return (
        <div className="login-box">
            <Container id="panel">
                <Logo />
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
                                placeholder="학번을 입력해주세요"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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

export default Login;
