import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

export default function InputColors() {
  return (
    <div>
      <IInput color="light" placeholder="Light" />
      <IInput color="dark" placeholder="Dark" />
      <IInput color="neutral" placeholder="Neutral" />
    </div>
  );
}
