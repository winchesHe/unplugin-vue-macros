import { customRef, getCurrentInstance, onMounted, onUpdated } from 'vue'

export default function () {
  const instance = getCurrentInstance()!

  return new Proxy(
    {},
    {
      get(target, key: string) {
        let _trigger = (): void => undefined
        const element = customRef((track, trigger) => {
          _trigger = trigger
          return {
            get() {
              track()
              return instance?.proxy?.$refs[key]
            },
            set: () => undefined,
          }
        })

        onMounted(_trigger)
        onUpdated(_trigger)

        return element
      },
    }
  )
}
