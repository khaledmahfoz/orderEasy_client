import styled, {keyframes} from 'styled-components'

const smallLoadingAnimation = keyframes`
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
`

export const SmallLoading = styled.div`
   &:after {
      content: " ";
      display: block;
      width: 25px;
      height: 25px;
      margin: 8px;
      border-radius: 50%;
      border: 3px solid ${props => props.color};
      border-color: ${props => props.color} transparent ${props => props.color} transparent;
      animation: ${smallLoadingAnimation} 1.2s linear infinite;
   }
`
export const SmallLoadingMenu = styled(SmallLoading)`
   position: absolute;
   top: 50%;
   right: .5rem;
   transform: translateY(-50%);
`