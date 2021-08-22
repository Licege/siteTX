import classes from '../styles/block.module.css'

export const Block = ({ className = '', children }) => (
  <div className={`${classes.block} ${className}`}>
    {children}
  </div>
)

export const BlockWithLabel = ({ className, label, actionText, onClickAction, children }) => (
  <div>
    <div className={classes.block__header}>
      <div className={classes.header__title}>
        {label}
      </div>
      {onClickAction ? (
        <button className={classes.header__action} onClick={onClickAction}>{actionText}</button>
      ) : null}
    </div>
    <Block className={className}>
      {children}
    </Block>
  </div>
)