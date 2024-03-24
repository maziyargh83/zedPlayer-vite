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
  const updateStatuses = (_status: CardRootProps[]) => {
    setStatuses(_status);
    onUpdateStatus(_status);
  };
  const updateSingleStatus = (item: Partial<CardRootProps>) => {
    const newStatuses = statuses.map((status) => {
      if (status.id === item.id) {
        return {
          ...status,
          ...item,
        };
      }
      return status;
    });
    updateStatuses(newStatuses);
  };

  return (
    <Fragment>
      <Reorder.Group
        axis="x"
        onReorder={updateStatuses}
        values={statuses}
        className="flex justify-between space-x-3"
      >
        <AnimatePresence initial={false}>
          {statuses.map((status) => (
            <Drag.Root key={status.id}>
              {({ controls }) => (
                <Reorder.Item
                  value={status}
                  className="flex-1 flex"
                  id={status.id}
                  dragListener={false}
                  dragControls={controls}
                >
                  <Card.Root
                    {...status}
                    icon={<IconDisplay icon={status.iconName} />}
                    onChange={updateSingleStatus}
                  >
                    <Drag.Trigger element={<Card.Header />}>
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
                    </Drag.Trigger>
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
