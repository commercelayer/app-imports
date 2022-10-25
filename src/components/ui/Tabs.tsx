import React, { ReactNode, Children, useEffect, useState } from 'react'
import invariant from 'ts-invariant'
import cn from 'classnames'

interface Props {
  onTabSwitch: (tabIndex: number) => void
  children: Array<React.ReactElement<TabProps, typeof Tab>>
}

export function Tabs({ children, onTabSwitch, ...rest }: Props): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(
    function validateChildren() {
      Children.map(children, (tab, index) => {
        invariant(
          tab.type.name,
          `Only "<Tab>" components can be used as children. Invalid at index #${index}`
        )

        invariant(
          tab.props.name,
          `Missing prop "name" in <Tab> component at index #${index}`
        )
        invariant(
          typeof tab.props.name === 'string',
          `Prop "name" must be a string. Invalid at index #${index}`
        )
      })
    },
    [children]
  )

  useEffect(() => {
    onTabSwitch(activeIndex)
  }, [activeIndex])

  const allNavs = Children.map(children, (tab) => tab.props.name)

  return (
    <div className='py-5' {...rest}>
      {/* Navs */}
      <nav className='flex'>
        {allNavs.map((navLabel, index) => (
          <TabNav
            key={index}
            isActive={index === activeIndex}
            label={navLabel}
            onClick={() => {
              setActiveIndex(index)
            }}
            data-test-id={`tab-nav-${index}`}
          />
        ))}
      </nav>
      {/* Tab Panels */}
      {Children.map(children, (tab, index) => {
        return (
          <TabPanel
            isActive={index === activeIndex}
            data-test-id={`tab-panel-${index}`}
          >
            {tab.props.children}
          </TabPanel>
        )
      })}
    </div>
  )
}

interface TabProps {
  name: string
  children: ReactNode
}

export function Tab({ children }: TabProps): React.ReactElement {
  return <>{children}</>
}

function TabNav({
  isActive,
  label,
  onClick,
  ...rest
}: {
  isActive: boolean
  onClick: () => void
  label: string
}): JSX.Element {
  return (
    <div
      className={cn(
        'flex-1 text-center py-4 cursor-pointer font-medium transition-all duration-300',
        {
          'border-b-black border-b-2 text-black': isActive,
          'border-b-gray-100 border-b text-gray-500': !isActive
        }
      )}
      onClick={onClick}
      {...rest}
    >
      {label}
    </div>
  )
}

function TabPanel({
  children,
  isActive,
  ...rest
}: {
  isActive: boolean
  children: ReactNode
}): JSX.Element | null {
  if (!isActive) {
    return null
  }

  return (
    <div className='pt-4' {...rest}>
      {children}
    </div>
  )
}
