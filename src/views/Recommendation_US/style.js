import styled from 'styled-components';

export const DivWrapper = styled.div`
  .imageTabBox {
    overflow: hidden;
    text-align: center;
    .active {
      color: #e2001a;
      border-bottom: 4px solid #e2001a;
      cursor: pointer;
    }
  }
  .type-icon {
    border: 1px solid #ec001a;
    border-radius: 100%;
    position: absolute;
    width: 64px;
    height: 64px;
    left: 50%;
    top: -32px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .benefit ul > li {
    height: auto;
    text-align: left;
    list-style: disc;
  }
`;
