const STEPS = [
  { num: '01', title: 'Understand', desc: 'We start with the business, not the technology. What are you trying to achieve? What isn\'t working? What needs to change?' },
  { num: '02', title: 'Assess', desc: 'We examine the existing system, requirements, constraints, and technical environment.' },
  { num: '03', title: 'Plan', desc: 'We determine the simplest practical solution and map the path from where you are to where you need to be.' },
  { num: '04', title: 'Build', desc: 'We develop, test, and iterate around real business requirements.' },
  { num: '05', title: 'Transition', desc: 'For migrations and rebuilds, we move applications and data carefully, and validate the results.' },
  { num: '06', title: 'Improve', desc: 'After launch, we keep maintaining, optimizing, and evolving the system as the business grows.' },
];

export default function HowWeWork() {
  return (
    <section id="approach">
      <div className="wrap">
        <div className="head reveal">
          <p className="eyebrow">How we work</p>
          <h2>Engineering starts with understanding the problem.</h2>
        </div>
        <div className="timeline reveal">
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
