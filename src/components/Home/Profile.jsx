import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Profile = ({ name, birth, age, profileImage }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ProfileImage src={profileImage} alt={`${name}의 프로필`} />
      <TextWrapper>
        <NameText>{name} 어르신</NameText>
        <InfoText>
          {birth} ・ 만 {age}세
        </InfoText>
      </TextWrapper>
      <ChevronIcon
        name="chevron-forward-outline"
        onClick={() => navigate("/settings")}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: stretch;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  flex: 1 0 0;
  align-self: stretch;
`;

const NameText = styled.div`
  color: var(--text-primary, #171719);
  font-feature-settings: "ss10" on;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 141.2%;
`;

const InfoText = styled.div`
  color: var(--text-secondary, #37383c);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 142.9%;
  letter-spacing: 0.203px;
`;

const ChevronIcon = styled("ion-icon")`
  font-size: 20px;
  color: var(--icon-secondary);
  cursor: pointer;
`;

export default Profile;
