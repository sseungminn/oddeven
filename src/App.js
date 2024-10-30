import React, { useState } from 'react';
import './App.css';
import './Custom.css';

function App() {
  const [groupA, setGroupA] = useState(null);
  const [groupB, setGroupB] = useState(null);
  const [groupC, setGroupC] = useState(null);

  // 배팅 옵션과 배당률 정의
  const bettingOptions = {
    "ODD": { numbers: [1, 3, 5, 7, 9, 11], payout: 1.95 },
    "EVEN": { numbers: [2, 4, 6, 8, 10, 12], payout: 1.95 },
    "UNDER": { numbers: [1, 2, 3, 4, 5, 6], payout: 1.95 },
    "OVER": { numbers: [7, 8, 9, 10, 11, 12], payout: 1.95 },
    "ODD-UNDER": { numbers: [1, 3, 5], payout: 3.60 },
    "ODD-OVER": { numbers: [7, 9, 11], payout: 3.60 },
    "EVEN-UNDER": { numbers: [2, 4, 6], payout: 3.60 },
    "EVEN-OVER": { numbers: [8, 10, 12], payout: 3.60 },
    "ODD-SMALL": { numbers: [1, 3], payout: 5.40 },
    "ODD-MEDIUM": { numbers: [5, 7], payout: 5.40 },
    "ODD-LARGE": { numbers: [9, 11], payout: 5.40 },
    "EVEN-SMALL": { numbers: [2, 4], payout: 5.40 },
    "EVEN-MEDIUM": { numbers: [6, 8], payout: 5.40 },
    "EVEN-LARGE": { numbers: [10, 12], payout: 5.40 },
  };

  // 선택 핸들러
  const handleSelect = (group, option) => {
    if (group === "A") {
      setGroupA(prev => (prev === option ? null : option));
      setGroupC(null); // A 그룹이 바뀌면 C 그룹 초기화
    } else if (group === "B") {
      setGroupB(prev => (prev === option ? null : option));
      setGroupC(null); // B 그룹을 선택하면 C 그룹 초기화
    } else if (group === "C" && groupA) {
      setGroupC(prev => (prev === option ? null : option));
      setGroupB(null); // C 그룹을 선택하면 B 그룹 초기화
    }
  };

  // 선택된 숫자 가져오기
  const selectedNumbers = () => {
    if (groupA && groupB) return bettingOptions[`${groupA}-${groupB}`].numbers;
    if (groupA && groupC) return bettingOptions[`${groupA}-${groupC}`].numbers;
    if (groupA) return bettingOptions[groupA].numbers;
    if (groupB) return bettingOptions[groupB].numbers;
    return [];
  };

  // 선택된 배당률 가져오기
  const selectedPayout = () => {
    if (groupA && groupB) return bettingOptions[`${groupA}-${groupB}`].payout;
    if (groupA && groupC) return bettingOptions[`${groupA}-${groupC}`].payout;
    if (groupA) return bettingOptions[groupA].payout;
    if (groupB) return bettingOptions[groupB].payout;
    return null;
  };

  return (
    <div className="betting-game">
      <div className="payout-display">
        <p>ODDS: x{selectedPayout() || "0"}</p>
      </div>
      <div className="button-container">
        <div></div>
        <div className="button-group-a">
          <button onClick={() => handleSelect("A", "ODD")} className={groupA === "ODD" ? "selected" : ""}>ODD</button>
          <button onClick={() => handleSelect("A", "EVEN")} className={groupA === "EVEN" ? "selected" : ""}>EVEN</button>
        </div>
        <div></div>
        <div className="button-group-b">
          <button onClick={() => handleSelect("B", "UNDER")} className={groupB === "UNDER" ? "selected" : ""}>UNDER</button>
          <button onClick={() => handleSelect("B", "OVER")} className={groupB === "OVER" ? "selected" : ""}>OVER</button>
        </div>
        <div className="numbers-display">
          {[...Array(12)].map((_, index) => {
            const num = index + 1;
            return (
              <div
                key={num}
                className={`number ${selectedNumbers().includes(num) ? "highlighted" : ""}`}
              >
                {num}
              </div>
            );
          })}
        </div>
        <div className="button-group-c">
          <button onClick={() => handleSelect("C", "SMALL")} disabled={!groupA} className={groupC === "SMALL" ? "selected" : ""}>SMALL</button>
          <button onClick={() => handleSelect("C", "MEDIUM")} disabled={!groupA} className={groupC === "MEDIUM" ? "selected" : ""}>MEDIUM</button>
          <button onClick={() => handleSelect("C", "LARGE")} disabled={!groupA} className={groupC === "LARGE" ? "selected" : ""}>LARGE</button>
        </div>
      </div>
    </div>
  );
}

export default App;
