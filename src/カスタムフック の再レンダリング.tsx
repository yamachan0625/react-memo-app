import React, { useState, memo } from 'react';

// 同じカスタムフックを利用したコンポーネントでも、別々のstateとして扱われる
// useEffectなども使いまわしていることを考えれば当然である
const useCustomCount = (init: number) => {
  // CHIPS: useStateが返す関数(state更新関数)は毎回同じ関数が返されることが保証されている === trueであるということ
  const [count, setCount] = useState(init);
  return [count, setCount] as const;
};

// APPでcount1が変更され再レンダリングされてもchildコンポーネントは再利用される
const Child: React.FC<{ count: number }> = memo((props) => {
  console.log('render Child');
  return <p>Child: {props.count}</p>;
});

export default function App() {
  console.log('render App');
  const [count1, setCount1] = useCustomCount(0);
  const [count2, setCount2] = useCustomCount(0);

  return (
    <>
      <button onClick={() => setCount1(count1 + 1)}>countup App count</button>
      <button onClick={() => setCount2(count2 + 1)}>countup Child count</button>
      <p>App: {count1}</p>
      <Child count={count2} />
    </>
  );
}
