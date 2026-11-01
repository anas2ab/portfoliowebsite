import { LazyMotion, MotionConfig, domAnimation, m } from "framer-motion";
import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { links, work, type Work } from "./content";

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

const easeOut = [.16, 1, .3, 1] as const;

const stagger = { show: { transition: { staggerChildren: .07 } } };
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: .6, ease: easeOut } },
};
const liftIn = {
  hidden: { opacity: 0, y: 64 },
  show: { opacity: 1, y: 0, transition: { duration: .8, ease: easeOut } },
};

// Long enough that crossing a row on the way to another doesn't repaint the whole screen.
const hoverIntent = 90;

function Header() {
  return (
    <header className="top">
      <div className="intro">
        <img className="portrait" src={asset("anas-butt-illustrated.webp")} alt="" width="1200" height="800" fetchPriority="high" />
        <h1>Anas Butt, software engineer.</h1>
      </div>
      <nav aria-label="Contact and profiles">
        <a href={links.resume} target="_blank" rel="noreferrer">Résumé</a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="action" href={links.email}>Email me</a>
      </nav>
    </header>
  );
}

function Panel({ item, active }: { item: Work; active: boolean }) {
  return (
    <m.div
      className={item.product ? "panel panel-product" : "panel panel-roles"}
      id={`panel-${item.id}`}
      role="tabpanel"
      aria-labelledby={`tab-${item.id}`}
      hidden={!active}
      initial={false}
      animate={active ? "show" : "hidden"}
      variants={stagger}
    >
      {item.roles?.map((role) => (
        <m.section key={role.title} className="role" variants={rise}>
          <h2>{role.title}</h2>
          <p className="role-years">{role.years}</p>
          <ul>{role.points.map((point) => <li key={point}>{point}</li>)}</ul>
        </m.section>
      ))}
      {item.product && (
        <>
          <div className="product-text">
            <m.h2 variants={rise}>{item.product.headline}</m.h2>
            <m.p variants={rise}>{item.product.summary}</m.p>
            <m.a className="action" variants={rise} href={item.product.site} target="_blank" rel="noreferrer">
              {item.product.siteLabel} <span aria-hidden="true">↗</span>
            </m.a>
          </div>
          <m.div className="product-shot" variants={liftIn}>
            <img src={asset(item.product.screenshot.file)} alt={item.product.screenshot.alt} width={item.product.screenshot.width} height={item.product.screenshot.height} />
          </m.div>
        </>
      )}
    </m.div>
  );
}

function initialWork() {
  return work.find((item) => `#${item.id}` === window.location.hash) ?? work[0];
}

export default function App() {
  const [active, setActive] = useState(initialWork);
  const [behind, setBehind] = useState<Work | null>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.dataset.field = active.id;
  }, [active]);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const select = (item: Work) => {
    window.clearTimeout(hoverTimer.current);
    if (item.id === active.id) return;
    setBehind(active);
    setActive(item);
    window.history.replaceState(null, "", `#${item.id}`);
  };

  const onRowKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = work.length - 1;
    const forward = index === last ? 0 : index + 1;
    const back = index === 0 ? last : index - 1;
    const targets: Record<string, number> = { ArrowDown: forward, ArrowRight: forward, ArrowUp: back, ArrowLeft: back, Home: 0, End: last };
    const next = targets[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(work[next]);
    document.getElementById(`tab-${work[next].id}`)?.focus();
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {behind && <div className="field" data-field={behind.id} aria-hidden="true" />}
        <m.div
          key={active.id}
          className="field field-rising"
          data-field={active.id}
          aria-hidden="true"
          initial={behind ? { scaleY: 0 } : false}
          animate={{ scaleY: 1 }}
          transition={{ duration: .55, ease: easeOut }}
        />
        <div className="page">
          <Header />
          <main>
            <div className="rows" role="tablist" aria-orientation="vertical" aria-label="Recent work">
              {work.map((item, index) => (
                <Fragment key={item.id}>
                  {item.group !== work[index - 1]?.group && <p className="row-group" aria-hidden="true">{item.group}</p>}
                  <button
                    id={`tab-${item.id}`}
                    className="row"
                    role="tab"
                    aria-label={`${item.group.replace("@", "at")} ${item.name}, ${item.kind}`}
                    aria-selected={item.id === active.id}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={item.id === active.id ? 0 : -1}
                    onClick={() => select(item)}
                    onKeyDown={(event) => onRowKey(event, index)}
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "mouse") return;
                      window.clearTimeout(hoverTimer.current);
                      hoverTimer.current = window.setTimeout(() => select(item), hoverIntent);
                    }}
                    onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
                  >
                    <span className="row-name"><span>{item.name}</span></span>
                    <span className="row-kind">{item.kind}</span>
                  </button>
                </Fragment>
              ))}
            </div>
            {work.map((item) => <Panel key={item.id} item={item} active={item.id === active.id} />)}
          </main>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
