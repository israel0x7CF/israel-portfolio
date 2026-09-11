type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DiagramLayout = {
  canvas: { width: number; height: number };
  left: Omit<Box, "y" | "height">;
  center: Box;
  right: Omit<Box, "y" | "height">;
  rows: readonly number[];
  sideHeight: number;
  sidePadding: number;
  centerPadding: number;
  connectorGap: number;
};

type SideNodeProps = {
  box: Box;
  fill: string;
  lines: readonly string[];
  nodeId: string;
  padding: number;
  fontSize?: number;
  letterSpacing?: number;
  lineHeight?: number;
};

const desktopLayout = createLayout({
  canvas: { width: 760, height: 360 },
  outerInset: 32,
  sideWidth: 194,
  sideHeight: 42,
  sidePadding: 14,
  centerPadding: 24,
  connectorGap: 32,
  rowStart: 86,
  rowGap: 8,
  centerHeight: 130,
});

const compactLayout = createLayout({
  canvas: { width: 320, height: 240 },
  outerInset: 8,
  sideWidth: 88,
  sideHeight: 38,
  sidePadding: 8,
  centerPadding: 10,
  connectorGap: 18,
  rowStart: 52,
  rowGap: 6,
  centerHeight: 116,
});

const desktopLeftLabels = [
  ["API + RULES"],
  ["DATA + WORKFLOW"],
  ["EXTERNAL SYSTEMS"],
  ["RUNTIME BEHAVIOR"],
] as const;

const desktopRightLabels = [
  ["CLEAR AUTHORITY"],
  ["LEGAL TRANSITIONS"],
  ["INTEGRATION CONTROL"],
  ["FAILURE CONTEXT"],
] as const;

const compactLeftLabels = [
  ["API + RULES"],
  ["DATA +", "WORKFLOW"],
  ["EXTERNAL", "SYSTEMS"],
  ["RUNTIME", "BEHAVIOR"],
] as const;

const compactRightLabels = [
  ["CLEAR", "AUTHORITY"],
  ["LEGAL", "TRANSITIONS"],
  ["INTEGRATION", "CONTROL"],
  ["FAILURE", "CONTEXT"],
] as const;

function createLayout({
  canvas,
  outerInset,
  sideWidth,
  sideHeight,
  sidePadding,
  centerPadding,
  connectorGap,
  rowStart,
  rowGap,
  centerHeight,
}: {
  canvas: DiagramLayout["canvas"];
  outerInset: number;
  sideWidth: number;
  sideHeight: number;
  sidePadding: number;
  centerPadding: number;
  connectorGap: number;
  rowStart: number;
  rowGap: number;
  centerHeight: number;
}): DiagramLayout {
  const centerWidth = canvas.width - 2 * (outerInset + sideWidth + connectorGap);
  const centerX = outerInset + sideWidth + connectorGap;

  return {
    canvas,
    left: { x: outerInset, width: sideWidth },
    center: {
      x: centerX,
      y: (canvas.height - centerHeight) / 2,
      width: centerWidth,
      height: centerHeight,
    },
    right: { x: centerX + centerWidth + connectorGap, width: sideWidth },
    rows: Array.from({ length: 4 }, (_, index) => rowStart + index * (sideHeight + rowGap)),
    sideHeight,
    sidePadding,
    centerPadding,
    connectorGap,
  };
}

function SideNode({
  box,
  fill,
  lines,
  nodeId,
  padding,
  fontSize = 12,
  letterSpacing = 1,
  lineHeight = 15,
}: SideNodeProps) {
  const firstBaseline = box.y + box.height / 2 - ((lines.length - 1) * lineHeight) / 2 + fontSize / 3;

  return (
    <g data-node={nodeId}>
      <rect data-node-box="" {...box} rx="8" fill={fill} stroke="rgba(27,36,48,0.16)" />
      <text
        data-node-label=""
        x={box.x + padding}
        y={firstBaseline}
        fill="var(--ink)"
        fontFamily="var(--font-technical)"
        fontSize={fontSize}
        letterSpacing={letterSpacing}
      >
        {lines.map((line, index) => (
          <tspan x={box.x + padding} dy={index === 0 ? 0 : lineHeight} key={line}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function Connectors({ layout, markerId }: { layout: DiagramLayout; markerId: string }) {
  const leftEdge = layout.left.x + layout.left.width;
  const leftRail = leftEdge + layout.connectorGap / 2;
  const centerRight = layout.center.x + layout.center.width;
  const rightRail = centerRight + layout.connectorGap / 2;
  const connectorY = layout.center.y + layout.center.height / 2;
  const rowCenters = layout.rows.map((rowY) => rowY + layout.sideHeight / 2);
  const lastRowCenter = rowCenters[rowCenters.length - 1];

  return (
    <g fill="none" stroke="var(--ink)" strokeWidth="2">
      <line data-connector="left-rail" x1={leftRail} y1={rowCenters[0]} x2={leftRail} y2={lastRowCenter} />
      {rowCenters.map((rowCenter) => (
        <line data-connector="left-branch" x1={leftEdge} y1={rowCenter} x2={leftRail} y2={rowCenter} key={`left-${rowCenter}`} />
      ))}
      <line data-connector="into-center" x1={leftRail} y1={connectorY} x2={layout.center.x} y2={connectorY} markerEnd={`url(#${markerId})`} />

      <line data-connector="out-of-center" x1={centerRight} y1={connectorY} x2={rightRail} y2={connectorY} markerEnd={`url(#${markerId})`} />
      <line data-connector="right-rail" x1={rightRail} y1={rowCenters[0]} x2={rightRail} y2={lastRowCenter} />
      {rowCenters.map((rowCenter) => (
        <line data-connector="right-branch" x1={rightRail} y1={rowCenter} x2={layout.right.x} y2={rowCenter} key={`right-${rowCenter}`} />
      ))}
    </g>
  );
}

function DiagramFrame({ layout }: { layout: DiagramLayout }) {
  return (
    <>
      <rect x="1" y="1" width={layout.canvas.width - 2} height={layout.canvas.height - 2} rx="8" fill="var(--bg)" stroke="rgba(27,36,48,0.14)" />
      <circle cx={layout.canvas.width / 2} cy={layout.canvas.height / 2} r={layout.canvas.height * 0.25} fill="var(--sun)" opacity="0.44" />
      <circle cx={layout.canvas.width * 0.13} cy={layout.canvas.height * 0.82} r={layout.canvas.height * 0.15} fill="var(--pink)" opacity="0.45" />
      <circle cx={layout.canvas.width * 0.87} cy={layout.canvas.height * 0.19} r={layout.canvas.height * 0.15} fill="var(--blue)" opacity="0.45" />
    </>
  );
}

function DesktopDiagram() {
  const headerY = desktopLayout.rows[0] - 30;
  const centerX = desktopLayout.center.x + desktopLayout.centerPadding;
  const centerBlockTop = desktopLayout.center.y + (desktopLayout.center.height - 76) / 2;

  return (
    <svg className="ownership-diagram-desktop" viewBox={`0 0 ${desktopLayout.canvas.width} ${desktopLayout.canvas.height}`} aria-hidden="true">
      <defs>
        <marker id="ownership-arrow-desktop" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" orient="auto" refX="8" refY="4">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--ink)" />
        </marker>
      </defs>

      <DiagramFrame layout={desktopLayout} />
      <Connectors layout={desktopLayout} markerId="ownership-arrow-desktop" />

      <text x={desktopLayout.left.x + desktopLayout.sidePadding} y={headerY} fill="var(--coral-deep)" fontFamily="var(--font-technical)" fontSize="12" letterSpacing="1.2">CROSSING BOUNDARIES</text>
      {desktopLeftLabels.map((lines, index) => (
        <SideNode box={{ ...desktopLayout.left, y: desktopLayout.rows[index], height: desktopLayout.sideHeight }} fill="var(--pink)" lines={lines} nodeId={`desktop-left-${index}`} padding={desktopLayout.sidePadding} key={lines.join(" ")} />
      ))}

      <g data-node="desktop-center">
        <rect data-node-box="" {...desktopLayout.center} rx="8" fill="var(--blue)" stroke="rgba(27,36,48,0.18)" />
        <g data-node-label="">
          <text x={centerX} y={centerBlockTop + 11} fill="var(--coral-deep)" fontFamily="var(--font-technical)" fontSize="12" letterSpacing="1.2">ISRAEL OWNS</text>
          <text x={centerX} y={centerBlockTop + 43} fill="var(--ink)" fontFamily="var(--font-sans)" fontSize="27" fontWeight="700">the whole flow</text>
          <text x={centerX} y={centerBlockTop + 73} fill="var(--ink-soft)" fontFamily="var(--font-technical)" fontSize="12" letterSpacing="1">DEV → PRODUCTION</text>
        </g>
      </g>

      <text x={desktopLayout.right.x + desktopLayout.sidePadding} y={headerY} fill="var(--coral-deep)" fontFamily="var(--font-technical)" fontSize="12" letterSpacing="1.2">COHERENT BACKEND</text>
      {desktopRightLabels.map((lines, index) => (
        <SideNode box={{ ...desktopLayout.right, y: desktopLayout.rows[index], height: desktopLayout.sideHeight }} fill="var(--sun)" lines={lines} nodeId={`desktop-right-${index}`} padding={desktopLayout.sidePadding} key={lines.join(" ")} />
      ))}
    </svg>
  );
}

function CompactDiagram() {
  const headerY = compactLayout.rows[0] - 27;
  const centerX = compactLayout.center.x + compactLayout.centerPadding;
  const centerBlockTop = compactLayout.center.y + (compactLayout.center.height - 88) / 2;

  return (
    <svg className="ownership-diagram-compact" viewBox={`0 0 ${compactLayout.canvas.width} ${compactLayout.canvas.height}`} aria-hidden="true">
      <defs>
        <marker id="ownership-arrow-compact" markerHeight="6" markerWidth="6" markerUnits="userSpaceOnUse" orient="auto" refX="6" refY="3">
          <path d="M0 0 L6 3 L0 6 Z" fill="var(--ink)" />
        </marker>
      </defs>

      <DiagramFrame layout={compactLayout} />
      <Connectors layout={compactLayout} markerId="ownership-arrow-compact" />

      <text x={compactLayout.left.x + compactLayout.sidePadding} y={headerY} fill="var(--coral-deep)" fontFamily="var(--font-technical)" fontSize="9" letterSpacing="0.4">
        <tspan x={compactLayout.left.x + compactLayout.sidePadding}>CROSSING</tspan>
        <tspan x={compactLayout.left.x + compactLayout.sidePadding} dy="11">BOUNDARIES</tspan>
      </text>
      {compactLeftLabels.map((lines, index) => (
        <SideNode box={{ ...compactLayout.left, y: compactLayout.rows[index], height: compactLayout.sideHeight }} fill="var(--pink)" lines={lines} nodeId={`compact-left-${index}`} padding={compactLayout.sidePadding} fontSize={9.5} letterSpacing={0.2} lineHeight={11} key={lines.join(" ")} />
      ))}

      <g data-node="compact-center">
        <rect data-node-box="" {...compactLayout.center} rx="8" fill="var(--blue)" stroke="rgba(27,36,48,0.18)" />
        <g data-node-label="">
          <text x={centerX} y={centerBlockTop + 10} fill="var(--coral-deep)" fontFamily="var(--font-technical)" fontSize="9" letterSpacing="0.3">ISRAEL OWNS</text>
          <text x={centerX} y={centerBlockTop + 35} fill="var(--ink)" fontFamily="var(--font-sans)" fontSize="16" fontWeight="700">
            <tspan x={centerX}>the whole</tspan>
            <tspan x={centerX} dy="18">flow</tspan>
          </text>
          <text x={centerX} y={centerBlockTop + 78} fill="var(--ink-soft)" fontFamily="var(--font-technical)" fontSize="9" letterSpacing="0.25">
            <tspan x={centerX}>DEV →</tspan>
            <tspan x={centerX} dy="10">PRODUCTION</tspan>
          </text>
        </g>
      </g>

      <text x={compactLayout.right.x + compactLayout.sidePadding} y={headerY} fill="var(--coral-deep)" fontFamily="var(--font-technical)" fontSize="9" letterSpacing="0.4">
        <tspan x={compactLayout.right.x + compactLayout.sidePadding}>COHERENT</tspan>
        <tspan x={compactLayout.right.x + compactLayout.sidePadding} dy="11">BACKEND</tspan>
      </text>
      {compactRightLabels.map((lines, index) => (
        <SideNode box={{ ...compactLayout.right, y: compactLayout.rows[index], height: compactLayout.sideHeight }} fill="var(--sun)" lines={lines} nodeId={`compact-right-${index}`} padding={compactLayout.sidePadding} fontSize={9.5} letterSpacing={0.2} lineHeight={11} key={lines.join(" ")} />
      ))}
    </svg>
  );
}

export function BackendOwnershipDiagram() {
  return (
    <div className="diagram-shell" role="img" aria-label="Backend flow across system boundaries">
      <DesktopDiagram />
      <CompactDiagram />
    </div>
  );
}
