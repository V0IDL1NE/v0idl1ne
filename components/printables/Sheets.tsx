/* Printable sheets. Plain server components — styling lives in globals.css (.sheet, .fill-row, @media print). */

function Fill({ label, value }: { label: string; value?: string }) {
  return (
    <div className="fill-row">
      <span>{label}</span>
      <span className="fill-line">{value && <strong>{value}</strong>}</span>
    </div>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <div className="check-row">
      <span className="box" />
      <span>{children}</span>
    </div>
  );
}

export function HomeEmergencySheet() {
  return (
    <div className="sheet">
      <h2>This home</h2>
      <Fill label="Address" />
      <Fill label="Nearest cross street" />
      <Fill label="Wi-Fi name / password" />

      <h2>Call</h2>
      <Fill label="Emergency" value="911" />
      <Fill label="Poison Control" value="1-800-222-1222" />
      <Fill label="Gas leak / utility emergency line" />
      <Fill label="Power outage line" />
      <Fill label="Landlord / property manager" />
      <Fill label="Plumber" />
      <Fill label="Electrician" />
      <Fill label="Insurance company + policy #" />
      <Fill label="Neighbor with a spare key" />

      <h2>Shutoffs — where exactly</h2>
      <Fill label="Main water shutoff" />
      <Fill label="Water heater shutoff" />
      <Fill label="Washing machine valves" />
      <Fill label="Gas meter / gas shutoff" />
      <Fill label="Tool to turn the gas off (where)" />
      <Fill label="Electrical panel / breaker box" />
      <p>Toilets and sinks: the valve is usually on the wall or floor right behind or under the fixture. Turn clockwise to close.</p>

      <h2>Breaker map</h2>
      <table className="inspect-table">
        <thead><tr><th>#</th><th>CONTROLS</th><th>#</th><th>CONTROLS</th></tr></thead>
        <tbody>
          {Array.from({ length: 12 }, (_, i) => (
            <tr key={i}>
              <td style={{ width: "2.2rem" }}>{i * 2 + 1}</td><td className="blank" />
              <td style={{ width: "2.2rem" }}>{i * 2 + 2}</td><td className="blank" />
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Where things are</h2>
      <Fill label="Fire extinguisher" />
      <Fill label="First aid kit" />
      <Fill label="Flashlights / batteries" />
      <Fill label="Home inventory video (backed up to)" />
      <Fill label="Meeting spot outside if there's a fire" />

      <h2>If you smell gas</h2>
      <p>Don&apos;t flip switches or light anything. Get everyone out, then call the gas utility&apos;s emergency line or 911 from outside.</p>
    </div>
  );
}

const ROOMS: { name: string; items: string[] }[] = [
  { name: "Entry / living room", items: ["Front door, lock, deadbolt", "Walls & paint", "Floor / carpet", "Ceiling", "Windows, screens, locks", "Blinds / curtains", "Lights & switches", "Outlets", "Closet & doors"] },
  { name: "Kitchen", items: ["Walls & floor", "Cabinets & drawers", "Countertops", "Sink, faucet, drain (run water)", "Garbage disposal", "Refrigerator & freezer", "Stove / oven / burners", "Dishwasher (run it)", "Microwave / range hood", "GFCI outlets (press TEST, then RESET)"] },
  { name: "Bathroom", items: ["Toilet (flush, check base for leaks)", "Tub / shower & caulk", "Sink, faucet, drain", "Water pressure & hot water", "Tiles & grout", "Mirror & cabinet", "Exhaust fan", "Signs of mold or water damage", "GFCI outlet"] },
  { name: "Bedroom 1", items: ["Walls & paint", "Floor / carpet", "Windows, screens, locks", "Closet & doors", "Lights, switches, outlets"] },
  { name: "Bedroom 2", items: ["Walls & paint", "Floor / carpet", "Windows, screens, locks", "Closet & doors", "Lights, switches, outlets"] },
  { name: "Safety & systems", items: ["Smoke detectors (press TEST)", "Carbon monoxide detector", "Heat works", "AC works", "Water heater (no leaks, rust)", "Breaker panel labeled", "Washer / dryer", "Pests: droppings, bugs, traps"] },
];

export function MoveInInspection() {
  return (
    <div className="sheet">
      <Fill label="Address & unit" />
      <Fill label="Move-in date" />
      <Fill label="Tenant(s)" />
      <Fill label="Landlord / manager" />
      <p>
        Note the condition of every item — &ldquo;good,&rdquo; or exactly what&apos;s wrong (&ldquo;3-inch scratch, left of window&rdquo;).
        Take a date-stamped photo of every problem and write the photo number in the last column. Email the photos to yourself
        and the landlord the same day, and keep a signed copy of this sheet.
      </p>

      {ROOMS.map(room => (
        <div key={room.name}>
          <h2>{room.name}</h2>
          <table className="inspect-table">
            <thead><tr><th>ITEM</th><th>CONDITION AT MOVE-IN</th><th>PHOTO #</th><th>CONDITION AT MOVE-OUT</th></tr></thead>
            <tbody>
              {room.items.map(item => (
                <tr key={item}>
                  <td style={{ width: "28%" }}>{item}</td>
                  <td className="blank" />
                  <td style={{ width: "10%" }} />
                  <td style={{ width: "25%" }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h2>Keys & notes</h2>
      <Fill label="Keys received (how many, which)" />
      <Fill label="Meter readings (electric / gas / water)" />
      <Fill label="Other notes" />
      <Fill label="" />

      <h2>Signatures</h2>
      <Fill label="Tenant signature & date" />
      <Fill label="Landlord signature & date" />

      <h2>Before you hand this in</h2>
      <Check>Every room photographed, including inside appliances and closets</Check>
      <Check>Photos emailed to yourself and the landlord (the email timestamp is your proof)</Check>
      <Check>Copy of this sheet kept for move-out day</Check>
    </div>
  );
}

function RightsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="wallet-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export function KnowYourRightsCard() {
  return (
    <div className="sheet">
      <p className="no-print">Print, cut along the dashed lines, and fold each pair back-to-back. Standard wallet size (3.5&Prime; × 2&Prime;).</p>
      <div>
        <RightsCard title="If police stop me">
          <ul>
            <li>Stay calm. Keep hands visible. Don&apos;t run or resist.</li>
            <li>Driving: hand over license, registration, insurance.</li>
            <li>I don&apos;t have to answer questions.</li>
            <li>Ask: <span className="quote">&ldquo;Am I free to go?&rdquo;</span> If yes, leave calmly.</li>
            <li>I can record police in public.</li>
          </ul>
        </RightsCard>
        <RightsCard title="What to say">
          <p className="quote">&ldquo;I am invoking my right to remain silent.&rdquo;</p>
          <p className="quote">&ldquo;I want a lawyer.&rdquo;</p>
          <p className="quote">&ldquo;I do not consent to searches.&rdquo;</p>
          <p style={{ marginTop: "0.06in" }}>Say it once, clearly — then stop talking. Silence alone doesn&apos;t count; say the words.</p>
        </RightsCard>
      </div>
      <div>
        <RightsCard title="If I'm arrested">
          <ul>
            <li>Say: <span className="quote">&ldquo;I want a lawyer.&rdquo;</span> Then nothing else.</li>
            <li>Don&apos;t explain, argue, or sign statements.</li>
            <li>Don&apos;t talk about the case on jail phones.</li>
            <li>Remember badge numbers, names, and car numbers.</li>
          </ul>
        </RightsCard>
        <RightsCard title="Emergency contacts">
          <div className="fill-row" style={{ padding: "0.04in 0" }}><span>Lawyer</span><span className="fill-line" /></div>
          <div className="fill-row" style={{ padding: "0.04in 0" }}><span>Family</span><span className="fill-line" /></div>
          <div className="fill-row" style={{ padding: "0.04in 0" }}><span>Friend</span><span className="fill-line" /></div>
          <p style={{ marginTop: "0.06in" }}>General information, not legal advice. v0idl1ne.com</p>
        </RightsCard>
      </div>
    </div>
  );
}
