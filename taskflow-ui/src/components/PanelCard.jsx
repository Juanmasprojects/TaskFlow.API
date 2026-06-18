function PanelCard({ title, children }) {
  return (
    <div className="panel-card">
      <h2>{title}</h2>

      {children}
    </div>
  )
}

export default PanelCard