import { useState } from 'react'
import styles from './ConfigPanel.module.css'

const LEATHER_COLORS = [
  { name: 'Midnight', hex: '#111111' },
  { name: 'Navy', hex: '#1b2a4a' },
  { name: 'British Tan', hex: '#8B6343' },
  { name: 'Cognac', hex: '#6B3A2A' },
  { name: 'Forest', hex: '#2D4A32' },
  { name: 'Burgundy', hex: '#5C1A2E' },
  { name: 'Camel', hex: '#C19A6B' },
  { name: 'Ivory', hex: '#F0EDE8' },
  { name: 'Slate', hex: '#3a4a5c' },
  { name: 'Chocolate', hex: '#3b2316' },
]

const FLEECE_COLORS = [
  { name: 'Black', hex: '#0f0f0f' },
  { name: 'Charcoal', hex: '#2a2a2a' },
  { name: 'Navy', hex: '#1b2a4a' },
  { name: 'Pewter', hex: '#5a5a5a' },
  { name: 'Ivory', hex: '#ece8e0' },
]

const STITCH_COLORS = [
  { name: 'Navy', hex: '#1b2a4a' },
  { name: 'Black', hex: '#111111' },
  { name: 'Ivory', hex: '#F0EDE8' },
  { name: 'Gold', hex: '#B8922A' },
  { name: 'Red', hex: '#8B1A1A' },
  { name: 'Silver', hex: '#8c8c8c' },
  { name: 'Forest', hex: '#2D4A32' },
]

function Swatch({ color, selected, onClick }) {
  return (
    <button
      className={`${styles.swatch} ${selected ? styles.swatchSelected : ''}`}
      style={{ '--swatch-color': color.hex }}
      onClick={onClick}
      title={color.name}
    />
  )
}

function Section({ label, colors, selected, onChange }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>{label}</span>
        <span className={styles.sectionValue} style={{ color: selected }}>
          {colors.find((c) => c.hex === selected)?.name ?? 'Custom'}
        </span>
      </div>
      <div className={styles.swatchGrid}>
        {colors.map((c) => (
          <Swatch
            key={c.hex}
            color={c}
            selected={selected === c.hex}
            onClick={() => onChange(c.hex)}
          />
        ))}
      </div>
    </div>
  )
}

export function ConfigPanel({ config, onChange, open, onToggle }) {
  const update = (key) => (val) => onChange((prev) => ({ ...prev, [key]: val }))

  return (
    <>
      {/* Toggle tab */}
      <button className={styles.tab} onClick={onToggle}>
        {open ? '‹' : '›'}
        <span>{open ? 'CLOSE' : 'CONFIGURE'}</span>
      </button>

      <aside className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        <div className={styles.panelInner}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Customize</span>
            <span className={styles.panelSubtitle}>French Seam Wood Cover</span>
          </div>

          <div className={styles.divider} />

          <Section
            label="Top Panel"
            colors={LEATHER_COLORS}
            selected={config.topLeather}
            onChange={update('topLeather')}
          />
          <Section
            label="Body Leather"
            colors={LEATHER_COLORS}
            selected={config.bottomLeather}
            onChange={update('bottomLeather')}
          />
          <Section
            label="Fleece Lining"
            colors={FLEECE_COLORS}
            selected={config.fleece}
            onChange={update('fleece')}
          />
          <Section
            label="Topstitching"
            colors={STITCH_COLORS}
            selected={config.stitching}
            onChange={update('stitching')}
          />
          <Section
            label="Accent Stitch"
            colors={STITCH_COLORS}
            selected={config.stitchAccent}
            onChange={update('stitchAccent')}
          />

          <div className={styles.divider} />

          <button className={styles.quoteBtn}>
            Request Quote
          </button>

          <p className={styles.hint}>Drag to rotate · Scroll to zoom</p>
        </div>
      </aside>
    </>
  )
}
