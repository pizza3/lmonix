import React from "react";
import { Wrapper, Header, Title } from "./styled";
import Switch from "../../designLib/Switch";
import ThreeContext from "../../context/ThreeContext";

const DefaultLights = () => {
  return (
    <ThreeContext.Consumer>
      {context => (
        <Wrapper>
          <Header>
            <Title>Default Lights</Title>
            <Switch
              checked={context.isDefaultLights}
              onChange={context.setDefaultLights}
            />
          </Header>
        </Wrapper>
      )}
    </ThreeContext.Consumer>
  );
};
export default DefaultLights;
