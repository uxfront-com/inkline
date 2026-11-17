import { ref } from "@uxfront/unframework";
import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

// Two-way binding: typing in the control updates `text`, reflected live below.
/** @category Components/Forms/Input */
export default function InputTwoWay() {
  const text = ref("world");
  return (
    <div>
      <IInput size="md" name="name" placeholder="Type your name" v-model:value={text.value} />
      <p>Hello, {text.value}!</p>
    </div>
  );
}
