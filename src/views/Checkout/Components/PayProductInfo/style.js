import styled from 'styled-components';

export const DivWrapper = styled.div`
  .product-catogery-item:not(:last-child):after {
    content: '';
    background-color: var(--rc-f6);
    height: 0.4rem;
    width: 100%;
    display: block;
  }
`;
