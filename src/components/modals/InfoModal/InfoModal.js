import React from "react";
import { MAX_MISTAKES } from "../../../lib/constants";
import { Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import BaseModal from "../BaseModal";

function InfoModal() {
  return (
    <BaseModal
      title=""
      trigger={<Info className="mr-4" />}
      initiallyOpen={false}
      actionButtonText="Got It!"
    >
      <Tabs defaultValue="how-to-play">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="how-to-play">How To Play</TabsTrigger>
          <TabsTrigger value="about-us">About Us</TabsTrigger>
        </TabsList>
        <TabsContent value="how-to-play">
          {" "}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What's The Goal?</AccordionTrigger>
              <AccordionContent>
                Find groups of items or names that share something in common.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How Do I Play?</AccordionTrigger>
              <AccordionContent>
                Select the items and tap 'Submit' to check if your guess matches
                one of the answer categories.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How Many Tries Do I Get?</AccordionTrigger>
              <AccordionContent>
                {`You can make ${MAX_MISTAKES} mistakes before the game ends.`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="about-us">
          {" "}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Who Are Y'all?</AccordionTrigger>
              <AccordionContent>
                This project is brought to you by andcomputers, feel free to
                subscribe to our writing and other experiments.{" "}
                <a
                  href="https://andcomputers.io/"
                  target="_blank"
                  className="underline font-bold"
                >
                  Check out our writing here.
                </a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How Can I Support?</AccordionTrigger>
              <AccordionContent>
                <p className="mb-1">If you'd like to support feel free!</p>
                <ul className="list-disc">
                  <li>
                    <p>Help us make an upcoming puzzle by </p>
                    <a
                      href="mailto:jcp@mail.andcomputers.io"
                      target="_blank"
                      className="underline font-bold"
                    >
                      emailing the team.
                    </a>
                  </li>
                  <li>
                    <p className="mt-2 mb-1">Help us pay for servers & time:</p>
                    <ul>
                      <li>
                        {" "}
                        - One-time contribution via{" "}
                        <a
                          href="https://buy.stripe.com/7sIg1Udac6xZegodQR"
                          target="_blank"
                          className="underline font-bold"
                        >
                          Stripe.
                        </a>
                      </li>
                      <li>
                        {" "}
                        - Recurring contributions via{" "}
                        <a
                          href="https://www.patreon.com/andcomputers"
                          target="_blank"
                          className="underline font-bold"
                        >
                          Patreon.
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Any Other Projects to Check Out?
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-flow-row">
                  <p>Just a few! </p>
                  <a
                    href="https://andcomputers.io/"
                    target="_blank"
                    className="underline font-bold"
                  >
                    - Our writing and thoughts are here.
                  </a>
                  <a
                    href="https://blacktwitter.io/"
                    target="_blank"
                    className="underline font-bold"
                  >
                    - BlackTwitter
                  </a>
                  <a
                    href="https://blackwords.andcomputers.io/"
                    target="_blank"
                    className="underline font-bold"
                  >
                    - Black Wordle
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

export default InfoModal;
