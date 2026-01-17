import Accordion from "../shared/accordion/Accordion";
import AccordionContent from "../shared/accordion/AccordionContent";
import AccordionController from "../shared/accordion/AccordionController";
import MobileAccordion from "./MobileAccordion";
import MobileLink from "./MobileLink";
const MobileMenuItem = ({ item }) => {
  const { title, href, children, accordion, sub_links_count, sub_links } = item;

  return !sub_links_count > 0 ? (
    <MobileLink item={{ title, href }} />
  ) : (
    <Accordion>
      <AccordionController type={"primary"}>
        <MobileLink item={{ title, href }} />
      </AccordionController>
      <AccordionContent>
        <MobileAccordion items={sub_links} />
      </AccordionContent>
    </Accordion>
  );
};

export default MobileMenuItem;
