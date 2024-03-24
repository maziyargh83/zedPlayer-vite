import { DownloadModal } from "@/components/downloadsList/downloadModal";
import { IconDisplay } from "@/components/primitives/iconLoader";
import Tabs from "@/components/primitives/tabs";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import Drag from "@/components/primitives/dragHandle";
import { AnimatePresence, Reorder } from "framer-motion";
import { Fragment, useState } from "react";
import { TabsItemProps } from "@/components/primitives/tabs.props";
export const DownloadTabs = ({ tabs }: { tabs: TabsItemProps[] }) => {
  const [statuses, updateStatuses] = useState<TabsItemProps[]>(tabs);

  return (
    <div>
      <Tabs.Root activeTab={tabs[0].name}>
        <Tabs.List
          lastItem={
            <DownloadModal>
              <Button className="space-x-2" variant={"ghost"}>
                Add url
                <FiPlus />
              </Button>
            </DownloadModal>
          }
        >
          <Reorder.Group
            axis="x"
            onReorder={updateStatuses}
            values={statuses}
            className="flex justify-between space-x-3"
          >
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
                    <Drag.Trigger
                      element={
                        <Tabs.Item
                          iconName={status.iconName}
                          icon={<IconDisplay icon={status.iconName} />}
                          theme={status.theme}
                          title={status.name}
                          name={status.name}
                          id={status.id}
                        />
                      }
                    >
                      {({ isHover }) => (
                        <Fragment>
                          {isHover && (
                            <Drag.Handle
                              top={5}
                              isHover={isHover}
                              controls={controls}
                            />
                          )}
                        </Fragment>
                      )}
                    </Drag.Trigger>
                  </Reorder.Item>
                )}
              </Drag.Root>
            ))}
          </Reorder.Group>
        </Tabs.List>
        <Tabs.Content></Tabs.Content>
        <Tabs.Content></Tabs.Content>
        <Tabs.Content></Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
