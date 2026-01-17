import Accordion from "../shared/accordion/Accordion";
import AccordionContent from "../shared/accordion/AccordionContent";
import AccordionController from "../shared/accordion/AccordionController";
import AccordionContainer from "../shared/containers/AccordionContainer";
import MobileLinkPrimary from "./MobileLinkPrimary";

const MobileAccordion = ({ items, children }) => {
  const isAccordion = items[0]?.accordion;
  return isAccordion ? (
    <AccordionContainer>
      {items.map(({ title, href, items }, idx) => (
        <Accordion key={idx}>
          <AccordionController type="primary">
            <MobileLinkPrimary item={{ title, href }} />
          </AccordionController>
          <AccordionContent>
            <ul>
              {items.map((item1, idx1) => (
                <li key={idx1} className="">
                  {/* <MobileLinkSecondary item={item1} /> */}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </Accordion>
      ))}
      {children && children}
    </AccordionContainer>
  ) : (
    <ul>
      {items.map((item1, idx1) => (
        <li key={idx1} className="close-mobile-menu text-default">
          <MobileLinkPrimary item={item1} />
        </li>
      ))}
    </ul>
  );
};

export default MobileAccordion;
