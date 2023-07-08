import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../store/RootStore';
import { MdCancel } from 'react-icons/md';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation.selectedLocation,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory.selectedCategory,
  );
  const navigate = useNavigate();

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputValue === '') {
      return;
    }
    navigate(`/search/${inputValue}`);
    setInputValue('');
  };

  const handleInputDelete = () => {
    setInputValue('');
  };

  return (
    <Wrapper>
      <form onSubmit={handleInputSubmit}>
        <SearchInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`${selectedLocation} 지역의 ${selectedCategory} 카테고리에서 검색하기`}
        />
        {inputValue && (
          <InputButton type="reset" onClick={handleInputDelete}>
            <MdCancel />
          </InputButton>
        )}
        <SearchButton type="submit">
          <AiOutlineSearch />
        </SearchButton>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  position: relative;
  & button {
    position: absolute;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  display: flex;
  width: 37.5rem;
  height: 3.125rem;
  padding: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const InputButton = styled.button`
  top: 0.8rem;
  right: 4rem;
  font-size: var(--font-size-m);
  &:hover {
    top: 0.7rem;
    right: 3.8rem;
    font-size: var(--font-size-l);
  }
`;

const SearchButton = styled.button`
  top: 0.6rem;
  right: 1rem;
  font-size: var(--font-size-l);
`;
