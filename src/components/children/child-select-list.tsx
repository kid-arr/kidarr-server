'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { env } from '@/env'

const ChildSelectList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user-children'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${env.NEXT_PUBLIC_BASE_URL}/child`,
        {
          withCredentials: true,
        },
      )
      return data as ChildModel[]
    },
  })
  if (isLoading) return <div>Loading....</div>
  if (isError) return <div>Error loading</div>
  return (
    <Select defaultValue={'____all____'}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Choose child' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='____all____'>(All Children)</SelectItem>
          {data?.map((r) => (
            <SelectItem
              key={r.name}
              value={r.name.toLowerCase()}
            >
              {r.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ChildSelectList
