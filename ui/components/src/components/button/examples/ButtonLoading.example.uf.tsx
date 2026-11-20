import "virtual:styleframe.css";
import IButton from "../styled/IButton.uf.tsx";

/**
 * A loading button keeps its focus and its name, blocks its own click and announces "Saving".
 *
 * @category Components/Actions/Button
 */
export default function ButtonLoading() {
  return (
    <div>
      <IButton color="primary" loading={true} loadingLabel="Saving" label="Save changes" />
    </div>
  );
}
