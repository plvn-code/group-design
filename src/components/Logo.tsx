/** Text mark: "GD" monogram square (as in the studio's stories) + GROUP DESIGN / by Olena Yakubets. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="logo">
      <span className="logo__mark" aria-hidden="true">
        GD
      </span>
      {!compact && (
        <span className="logo__text">
          <span className="logo__name">Group Design</span>
          <span className="logo__by">by Olena Yakubets</span>
        </span>
      )}
    </span>
  );
}
