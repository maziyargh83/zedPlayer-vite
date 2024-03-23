import Card from "@/components/primitives/card";
import { CardRootProps } from "@/components/primitives/card.props";
import { AnimatePresence, Reorder } from "framer-motion";
import { Fragment, useState } from "react";
import Drag from "@/components/primitives/dragHandle";
import { IconDisplay } from "@/components/primitives/iconLoader";
export const DownloadStatus = ({
  status,
  onUpdateStatus,
}: {
  status: CardRootProps[];
  onUpdateStatus: (status: CardRootProps[]) => void;
}) => {
  const [statuses, setStatuses] = useState([...status]);
  const updateStatus = () => {
    setStatuses((s) => {
      s[0].title = "messi komichi";
      return [...s];
    });
  };
  return (
    <Fragment>
      <h1 onClick={updateStatus}>hi</h1>
      <Reorder.Group
        axis="x"
        onReorder={(_status) => {
          setStatuses(_status);
          onUpdateStatus(_status);
        }}
        values={statuses}
        className="flex justify-between space-x-3"
      >
        <AnimatePresence initial={false}>
          {statuses.map((status) => (
            <Drag.Root key={status.title}>
              {({ controls }) => (
                <Reorder.Item
                  value={status}
                  className="flex-1 flex"
                  id={status.title}
                  dragListener={false}
                  dragControls={controls}
                >
                  <Card.Root
                    {...status}
                    icon={<IconDisplay icon={status.icon} />}
                  >
                    <Card.Header>
                      {({ isHover }) => (
                        <Fragment>
                          <Card.Title />
                          <AnimatePresence>
                            {isHover && (
                              <Drag.Handle
                                isHover={isHover}
                                controls={controls}
                              />
                            )}
                          </AnimatePresence>
                        </Fragment>
                      )}
                    </Card.Header>
                    <Card.Body className="py-3">
                      <Card.Footer />
                    </Card.Body>
                  </Card.Root>
                </Reorder.Item>
              )}
            </Drag.Root>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </Fragment>
  );
};
