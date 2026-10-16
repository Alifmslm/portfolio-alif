import styles from "./AboutPanel.module.css";

const PLACEHOLDER_CARDS = [0, 1, 2, 3];
const BAR_WIDTHS = ["55%", "90%", "70%"];

/**
 * About tab panel — the switchable content in the main column.
 * Distinct from the sidebar "about me" (profile + experience), which
 * never changes. Placeholder cards for now; real content later.
 */
export default function AboutPanel() {
  return (
    <section className={styles.aboutPanel} aria-label="About">
      <p className="sr-only">About content coming soon.</p>
      <div className={styles.aboutPanelGrid} aria-hidden="true">
        {PLACEHOLDER_CARDS.map((i) => (
          <div key={i} className={styles.aboutPanelCard}>
            {BAR_WIDTHS.map((width, j) => (
              <span
                key={j}
                className={styles.aboutPanelBar}
                style={{ width }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
