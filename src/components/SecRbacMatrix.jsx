import './SecRbacMatrix.css'

const PERMISSIONS = ['View', 'Reply', 'Send campaigns', 'Manage billing', 'Manage users']

const ROLES = [
  { name: 'Owner', note: 'Full access', grants: [true, true, true, true, true] },
  { name: 'Admin', note: 'Runs the workspace', grants: [true, true, true, false, true] },
  { name: 'Agent', note: 'Handles conversations', grants: [true, true, false, false, false] },
  { name: 'Analyst', note: 'Read & report', grants: [true, false, false, false, false] },
]

function SecRbacMatrix() {
  return (
    <section className="section sec-rbac">
      <div className="container">
        <span className="section-kicker">Role-based access</span>
        <h2 className="section-title">You decide who can do <span className="grad-word">what</span></h2>
        <p className="section-subtitle">
          Map every person to a role and every role to an exact set of permissions.
          Least privilege by default — nobody touches what they don&apos;t need.
        </p>

        <div className="sec-rbac-scroll">
          <div className="sec-rbac-grid" role="table" aria-label="Role and permission matrix">
            <div className="sec-rbac-corner" role="columnheader">Role</div>
            {PERMISSIONS.map((p) => (
              <div className="sec-rbac-colhead" role="columnheader" key={p}>{p}</div>
            ))}

            {ROLES.map((r) => (
              <div className="sec-rbac-line" role="row" key={r.name}>
                <div className="sec-rbac-role" role="rowheader">
                  <strong>{r.name}</strong>
                  <span>{r.note}</span>
                </div>
                {r.grants.map((granted, i) => (
                  <div className="sec-rbac-cell" role="cell" key={PERMISSIONS[i]}>
                    {granted ? (
                      <span className="sec-rbac-yes" aria-label="allowed">
                        <svg viewBox="0 0 24 24" width="11" height="11">
                          <path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : (
                      <span className="sec-rbac-no" aria-label="not allowed" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="sec-rbac-legend">
          <span><span className="sec-rbac-yes sec-rbac-yes--legend" aria-hidden="true"><svg viewBox="0 0 24 24" width="10" height="10"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span> Allowed</span>
          <span><span className="sec-rbac-no sec-rbac-no--legend" aria-hidden="true" /> Not allowed</span>
        </div>
      </div>
    </section>
  )
}

export default SecRbacMatrix
