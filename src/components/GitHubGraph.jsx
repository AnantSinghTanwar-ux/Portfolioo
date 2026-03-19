import GitHubCalendar from 'react-github-calendar'

export default function GitHubGraph() {
  return (
    <section id="github" className="py-16">
      <div className="section-container">
        <h2 className="section-title">Contribution Activity</h2>

        <div className="bg-glass border border-[#1e1e2e] rounded-2xl p-6 sm:p-8 overflow-x-auto">
          <GitHubCalendar
            username="AnantSinghTanwar-ux"
            colorScheme="dark"
            theme={{
              dark: ['#161622', '#2d1b69', '#4c1d95', '#6d28d9', '#7c3aed'],
            }}
            labels={{
              totalCount: '{{count}} contributions in the last year',
            }}
            fontSize={12}
            blockSize={13}
            blockMargin={4}
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
    </section>
  )
}
