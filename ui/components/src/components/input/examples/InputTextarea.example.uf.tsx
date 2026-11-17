import "virtual:styleframe.css";
import IInput from "../styled/IInput.uf.tsx";

export default function InputTextarea() {
  return (
    <div>
      <IInput size="md" name="bio" type="textarea" placeholder="Tell us about yourself" />
    </div>
  );
}
