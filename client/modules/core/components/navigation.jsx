import React from 'react';
import {Nav,NavItem} from 'react-bootstrap';
const Navigation = () => (
  <div>
    <Nav bsStyle="pills" activeKey={1}>
      <NavItem eventKey={1} href="/">Home</NavItem>
      <NavItem eventKey={2} href="/welcome/xxx">Welcome</NavItem>
      <NavItem eventKey={3} href="/new-post">New Post</NavItem>
      <NavItem eventKey={4} href="/todos">Todos</NavItem>
    </Nav>
  </div>
);

export default Navigation;
